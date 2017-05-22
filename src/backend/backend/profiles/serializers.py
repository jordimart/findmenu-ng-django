from rest_framework import serializers

from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    bio = serializers.CharField(allow_blank=True, required=False)
    image = serializers.SerializerMethodField()
    city = serializers.CharField(allow_blank=True, required=False)
    first_name = serializers.CharField(allow_blank=True, required=False)
    last_name = serializers.CharField(allow_blank=True, required=False)
    date_birth = serializers.CharField(allow_blank=True, required=False)
    friends = serializers.IntegerField(default=0, required=False)
    restaurants = serializers.IntegerField(default=0, required=False)

    class Meta:
        model = Profile
        fields = ('username', 'bio', 'image', 'city', 'first_name', 'last_name', 'date_birth', 'friends', 'restaurants')
        read_only_fields = ('username',)

    def get_image(self, obj):
        if obj.image:
            return obj.image

        return 'http://www4.csudh.edu/Assets/CSUDH-Sites/SLP/images/Faculty-Staff-photos/NoPhoto_icon-user-default.jpg'
