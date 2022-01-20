
from .models import Animal
from rest_framework import generics
# from .models import User
from django.contrib.auth.models import User

from .serializers import AnimalSerializer, RegistrationSerializer, UserSerializer,ChangePasswordSerializer 
from rest_framework import permissions, renderers, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers
import uuid
from adoptAnimal.permissions import IsOwnerOrReadOnly
from rest_framework_simplejwt.authentication import JWTAuthentication

from django.contrib.auth import get_user_model
from rest_framework.views import APIView



User = get_user_model()





class RegisterUser(generics.GenericAPIView):
    serializer_class = RegistrationSerializer

    def post(self, request):
        serializer = self.get_serializer(data = request.data)
        if(serializer.is_valid()):
            serializer.save()
            return Response({
                "RequestId": str(uuid.uuid4()),
                "Message": "User created successfully",
                
                "User": serializer.data}, status=status.HTTP_201_CREATED
                )
        
        return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class UserList(generics.ListCreateAPIView):
    # permission_classes = [IsOwnerOrReadOnly]
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = UserSerializer
    queryset = User.objects.all()
    

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    # permission_classes = [IsAuthenticatedOrReadOnly]
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = UserSerializer
    queryset = User.objects.all()


class currentLoginUser(APIView):
	permission_classes = (IsAuthenticated,)

	def get(self, request):
		serializer = UserSerializer(request.user)
		return Response(serializer.data)

class AnimalList(generics.ListCreateAPIView):
    authentication_classes=[JWTAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    serializer_class = AnimalSerializer
    queryset = Animal.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class AnimalDetail(generics.RetrieveUpdateDestroyAPIView):
    # permission_classes = [IsAuthenticatedOrReadOnly]
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer



class ChangePasswordView(generics.UpdateAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)