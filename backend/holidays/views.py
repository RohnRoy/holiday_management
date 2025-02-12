# backend/holidays/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from django.core.cache import cache
from django.utils import timezone
from datetime import datetime, timedelta
import requests
from .models import Holiday
from .serializers import HolidaySerializer

class HolidayList(APIView):
    def get(self, request):
        country = request.query_params.get('country', 'US')
        year = request.query_params.get('year', '2024')
        month = request.query_params.get('month')
        
        # Check database cache
        cache_expiry = timezone.now() - timedelta(hours=24)
        cached_holidays = Holiday.objects.filter(
            country=country,
            year=year,
            cached_at__gte=cache_expiry
        )
        
        if cached_holidays.exists():
            if month:
                cached_holidays = cached_holidays.filter(date__month=month)
            serializer = HolidaySerializer(cached_holidays, many=True)
            return Response({'response': {'holidays': serializer.data}})
            
        # If not in cache, fetch from API
        api_url = 'https://calendarific.com/api/v2/holidays'
        params = {
            'api_key': settings.CALENDARIFIC_API_KEY,
            'country': country,
            'year': year
        }
        
        try:
            response = requests.get(api_url, params=params)
            response.raise_for_status()
            data = response.json()
            
            # Cache the holidays in database
            holidays_data = data['response']['holidays']
            for holiday_data in holidays_data:
                holiday_date = datetime.strptime(
                    holiday_data['date']['iso'], 
                    '%Y-%m-%d'
                ).date()
                
                Holiday.objects.update_or_create(
                    name=holiday_data['name'],
                    country=country,
                    year=year,
                    date=holiday_date,
                    defaults={
                        'description': holiday_data.get('description', ''),
                        'type': holiday_data.get('type', ['Other'])[0],
                        'cached_at': timezone.now()
                    }
                )
            
            if month:
                holidays_data = [
                    h for h in holidays_data 
                    if datetime.strptime(h['date']['iso'], '%Y-%m-%d').month == int(month)
                ]
            
            return Response(data)
            
        except requests.exceptions.RequestException as e:
            return Response(
                {'error': 'Failed to fetch holidays'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class HolidaySearch(APIView):
    def get(self, request):
        query = request.query_params.get('q', '').lower()
        country = request.query_params.get('country', 'US')
        year = request.query_params.get('year', '2024')
        
        cache_expiry = timezone.now() - timedelta(hours=24)
        holidays = Holiday.objects.filter(
            country=country,
            year=year,
            cached_at__gte=cache_expiry,
            name__icontains=query
        )
        
        if not holidays.exists():
            return Response(
                {'error': 'No matching holidays found'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        serializer = HolidaySerializer(holidays, many=True)
        return Response({'holidays': serializer.data})