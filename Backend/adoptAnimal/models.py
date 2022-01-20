from typing_extensions import Required
from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin,BaseUserManager
from django.conf import settings



class Animal(models.Model):
        name= models.CharField(max_length=50)
        age= models.CharField(max_length=50)
        size = models.CharField(max_length=50, blank=True)
        type_animal= models.CharField(max_length=50)
        description = models.TextField(max_length=100)
        home= models.CharField(max_length=50)
        img_animal = models.ImageField()
        img_animal1 = models.ImageField(blank=True)
        img_animal2 = models.ImageField(blank=True)
        owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='owner', blank=True, null=True)
        date_created = models.DateField(auto_now_add=True)



class CustomAccountManager(BaseUserManager):
    def create_user(self,email,username,password,**other_fields):
        if not email:
            raise ValueError(_('Please provide an email address'))
        email=self.normalize_email(email)
        user=self.model(email=email,username=username, **other_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    def create_superuser(self,email,username,phone_number,password,**other_fields):
        other_fields.setdefault('is_staff',True)
        other_fields.setdefault('is_superuser',True)
        other_fields.setdefault('is_active',True)
        if other_fields.get('is_staff') is not True:
                raise ValueError(_('Please assign is_staff=True for superuser'))
        if other_fields.get('is_superuser') is not True:
                raise ValueError(_('Please assign is_superuser=True for superuser'))
        return self.create_user(email,username,phone_number,password,**other_fields)

class User(AbstractBaseUser,PermissionsMixin):
   email=models.EmailField()
   username= models.CharField(max_length=150, unique=True)
   phone_number = models.IntegerField()
   is_staff=models.BooleanField(default=False)
   is_active=models.BooleanField(default=True)
   
   USERNAME_FIELD='username'
   REQUIRED_FIELDS=['email','phone_number']
   objects=CustomAccountManager()



