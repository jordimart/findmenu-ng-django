from django.db import models


class Restaurant(models.Model):

    name = models.CharField(max_length=100)
    image = models.CharField(max_length=300)
    city = models.CharField(max_length=50)
    lat = models.FloatField(default=0)
    lon = models.FloatField(default=0)
    valoration = models.FloatField(default=0)
    review = models.IntegerField(default=0)
    users = models.IntegerField(default=0)
    breackfast_price = models.FloatField(default=0)
    launch_price = models.FloatField(default=0)
    dinner_price = models.FloatField(default=0)
    filters = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)



