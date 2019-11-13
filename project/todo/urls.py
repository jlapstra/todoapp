from django.urls import path
from . import views

urlpatterns = [
    path('api/todolists/', views.TodoListEndpoint.as_view()),
    path('api/createItem/', views.CreateItemEndpoint.as_view()),
    path('api/markComplete/', views.MarkCompleteEndpoint.as_view()),
    path('api/updateItem/', views.UpdateItemEndpoint.as_view()),
    path('api/deleteItem/', views.DeleteItemEndpoint.as_view()),
]
