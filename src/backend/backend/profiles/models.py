from django.db import models
from ..core.models import TimestampedModel
from ..authentication.models import User


class Profile(TimestampedModel):

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    image = models.URLField(blank=True)
    city = models.TextField(blank=True)
    first_name = models.TextField(blank=True)
    last_name = models.TextField(blank=True)
    date_birth = models.TextField(blank=True)
    friends = models.IntegerField(blank=True)
    restaurants = models.IntegerField(blank=True)

    def __str__(self):
        return self.user.username
