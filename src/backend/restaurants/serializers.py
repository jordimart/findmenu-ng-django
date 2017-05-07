from rest_framework import serializers
from .models import Restaurant


class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ('id', 'name', 'image', 'city', 'lat', 'lon', 'valoration', 'review', 'users', 'brackfast_price',
                  'launch_price', 'dinner_price', 'filters', 'created_at', 'updated_at')

    def create(self, validated_data):

        return Restaurant.objects.create(**validated_data)

    def update(self, instance, validated_data):

        instance.name = validated_data.get('name', instance.name)
        instance.image = validated_data.get('image', instance.image)
        instance.city = validated_data.get('city', instance.city)
        instance.lat = validated_data.get('lat', instance.lat)
        instance.lon = validated_data.get('lon', instance.lon)
        instance.valoration = validated_data.get('valoration', instance.valoration)
        instance.review = validated_data.get('review', instance.review)
        instance.users = validated_data.get('users', instance.users)
        instance.breackfast_price = validated_data.get('brackfast_price', instance.brackfast_price)
        instance.launch_price = validated_data.get('launch_price', instance.launch_price)
        instance.dinner_price = validated_data.get('dinner_price', instance.dinner_price)
        instance.created_at = validated_data.get('created_at', instance.created_at)
        instance.updated_at = validated_data.get('updated_at', instance.updated_at)
        instance.save()
        return instance
