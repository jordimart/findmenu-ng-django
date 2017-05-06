from django.contrib import admin

from .models import Restaurant


class RestaurantAdmin(admin.ModelAdmin):
    search_fields = ('name', 'city')
    ordering = ('-updated_at',)
    list_display = ('name', 'city', 'created_at', 'updated_at')

admin.site.register(Restaurant, RestaurantAdmin)
