from rest_framework import serializers
# from django.contrib.auth.models import User
from .models import Animal, User





class RegistrationSerializer(serializers.ModelSerializer):

     class Meta:
          model = User
          fields = ['id', 'username','password', 'email', 'phone_number']

     def validate(self, args,**kwargs):
          email = args.get('email', None)
          username = args.get('username', None)


          if User.objects.filter(email=email).exists():
               raise serializers.ValidationError({'email' : ('email already exists')})
          if User.objects.filter(username=username).exists():
               raise serializers.ValidationError({'username' : ('username already exists')})


          return super().validate(args)
     
     def create(self,validated_data):
          return User.objects.create_user(**validated_data)


class UserSerializer(serializers.ModelSerializer):
     owner = serializers.PrimaryKeyRelatedField(many=True, queryset=Animal.objects.all())
     class Meta:
          model= User
          fields = ['id', 'username', 'phone_number', 'email', 'owner']
          
class ChangePasswordSerializer(serializers.Serializer):
    model = User

    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)


class AnimalSerializer(serializers.ModelSerializer):
     owner = serializers.ReadOnlyField(source='owner.username')
     class Meta:
          model= Animal
          fields = '__all__'




