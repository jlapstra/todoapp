from django.shortcuts import render
from todo.models import TodoList, Item
from todo.serializers import (
    TodoListSerializer, ItemSerializer, CurrentUserSerializer,
    TodoCreateSerializer
)
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.parsers import FormParser

class TodoListEndpoint(generics.ListCreateAPIView):
    queryset = TodoList.objects.all()
    serializer_class = TodoListSerializer
    user_serializer_class = CurrentUserSerializer

    def get(self, request):
        try:
            queryset = TodoList.objects.filter(user=request.user.id)
        except TodoList.DoesNotExist:
            return Response({})
        list_serializer = self.serializer_class(queryset, many=True)
        user_serializer = self.user_serializer_class(request.user)
        data = {
            'user': user_serializer.data,
            'lists': list_serializer.data
        }
        return Response(data)

    def post(self, request):
        serializer = TodoCreateSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()

        return Response(serializer.data)

class DeleteItemEndpoint(generics.DestroyAPIView):
    serializer_class = ItemSerializer

    def delete(self, request):
        item = Item.objects.filter(id=request.data['id'])
        item.delete()

        return Response('')

class UpdateItemEndpoint(generics.UpdateAPIView):
    serializer_class = ItemSerializer

    def put(self, request):
        item = Item.objects.filter(id=request.data['id'])
        data = request.data
        data['todo_list'] = item[0].todo_list.id
        serializer = self.serializer_class(data=data)

        if serializer.is_valid():
            item.update(**serializer.data)
            return Response(serializer.data)
        return Response(serializer.errors)


class CreateItemEndpoint(generics.CreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()

        return Response(serializer.data)

class MarkCompleteEndpoint(generics.UpdateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    def put(self, request):
        item = Item.objects.get(id=request.data['id'])
        item.completed = True
        item.save()

        serializer = self.serializer_class(item)
        return Response(serializer.data)

