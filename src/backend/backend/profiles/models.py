from django.db import models
from ..core.models import TimestampedModel
from ..authentication.models import User


class Profile(TimestampedModel):

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True,)
    image = models.URLField(blank=True)
    city = models.CharField(blank=True, max_length=40)
    name = models.CharField(blank=True, max_length=40)
    first_name = models.CharField(blank=True, max_length=40)
    last_name = models.CharField(blank=True, max_length=40)
    date_birth = models.CharField(blank=True, max_length=40)
    friends = models.IntegerField(default=0)
    restaurants = models.IntegerField(default=0)

    def __str__(self):
        return self.user.username
