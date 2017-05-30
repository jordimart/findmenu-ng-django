from rest_framework import serializers

from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    email = serializers.CharField(source='user.email')
    created_at = serializers.CharField(source='user.created_at')
    bio = serializers.CharField(allow_blank=True, required=False)
    image = serializers.SerializerMethodField()
    city = serializers.CharField(allow_blank=True, required=False)
    name = serializers.CharField(allow_blank=True, required=False)
    first_name = serializers.CharField(allow_blank=True, required=False)
    last_name = serializers.CharField(allow_blank=True, required=False)
    date_birth = serializers.CharField(allow_blank=True, required=False)
    friends = serializers.IntegerField(default=0, required=False)
    restaurants = serializers.IntegerField(default=0, required=False)

    class Meta:
        model = Profile
        fields = ('username', 'bio', 'image', 'city', 'name', 'first_name', 'last_name', 'date_birth', 'friends',
                  'restaurants', 'email', 'created_at')
        read_only_fields = ('username', 'email')

    def get_image(self, obj):
        if obj.image:
            return obj.image

        return 'static/images/userdefault.jpg'
