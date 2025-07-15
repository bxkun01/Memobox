from django.shortcuts import render
from django.contrib.auth.models import User
from  .serializers import UserSerializer, NoteSerializer, ProfileSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Notes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import permissions
from .serializers import ProfileSerializer



class CreateUserView(generics.CreateAPIView):
    queryset= User.objects.all()
    serializer_class=UserSerializer
    permission_classes= [AllowAny]

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class=NoteSerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        user= self.request.user
        return Notes.objects.filter(author=user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class NoteDelete(generics.DestroyAPIView):
    serializer_class=NoteSerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        user= self.request.user
        return Notes.objects.filter(author=user)

class NoteUpdate(generics.UpdateAPIView):
    serializer_class=NoteSerializer
    permission_classes=[IsAuthenticated]

    def get_object(self):
        user= self.request.user
        return Notes.objects.get(pk=self.kwargs['pk'], author=user)
    

class ProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProfileSerializer
    parser_classes = [MultiPartParser, FormParser]  # Required for file uploads

    def get_object(self):
        return self.request.user.profile
    

class NoteDetail(generics.RetrieveAPIView):
    queryset = Notes.objects.all()
    serializer_class = NoteSerializer


    


    