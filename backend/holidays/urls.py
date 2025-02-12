from django.urls import path
from . import views

urlpatterns = [
    path('holidays/', views.HolidayList.as_view(), name='holiday-list'),
    path('holidays/search/', views.HolidaySearch.as_view(), name='holiday-search'),
]