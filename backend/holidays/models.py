from django.db import models

class Holiday(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    country = models.CharField(max_length=2)  # ISO country code
    date = models.DateField()
    type = models.CharField(max_length=50)
    year = models.IntegerField()
    cached_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['date']
        indexes = [
            models.Index(fields=['country', 'year']),
            models.Index(fields=['name']),
        ]

    def __str__(self):
        return f"{self.name} ({self.country} - {self.year})"
