from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Notes
from user.models import Profile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {
            "password": {"write_only": True}
        }  # Password can be received but won't be shown in responses

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model= Notes
        fields='__all__'
        extra_kwargs={
            "author": {"read_only":True}
        }

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email= serializers.EmailField(source='user.email')
    class Meta:
        model = Profile
        fields = ['username', 'bio', 'profile_picture', 'created_at','email']
