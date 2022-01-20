from django.urls import path
from adoptAnimal.views import RegisterUser
from .views import  AnimalList,AnimalDetail, UserList, UserDetail, currentLoginUser,ChangePasswordView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView




urlpatterns = [
    path('user/register/', RegisterUser.as_view(), name='register'),
    path('user/login/', TokenObtainPairView.as_view(), name='token'),
    path('user/refresh-token/', TokenRefreshView.as_view(), name='refreshtoken'),
    path('animals/', AnimalList.as_view(), name='animal'),
    path('animals/<int:pk>/', AnimalDetail.as_view(), name='animaldetail'),
    path('users/', UserList.as_view(), name='userlist'),
    path('users/<int:pk>/', UserDetail.as_view(), name='userlist'),
    path('users/current/', currentLoginUser.as_view(), name='currentuser'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),

]


