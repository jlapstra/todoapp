from rest_framework import serializers
from todo.models import TodoList, Item
from django.contrib.auth.models import User


class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email',)

class ItemSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Item
        fields = '__all__'

class TodoCreateSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    title = serializers.CharField(max_length=40)
    user = serializers.PrimaryKeyRelatedField(
            read_only=True, default=serializers.CurrentUserDefault())

    class Meta:
        model = TodoList
        fields = ('id', 'title', 'user')

    def create(self, validated_data):
        if 'user' not in validated_data:
            validated_data['user'] = self.context['request'].user
        return TodoList.objects.create(**validated_data)

class TodoListSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    title = serializers.CharField(max_length=40)
    user = serializers.PrimaryKeyRelatedField(
            read_only=True, default=serializers.CurrentUserDefault())
    items = ItemSerializer(source='get_items_in_list', many=True)
    completed_items = ItemSerializer(source='get_completed_in_list', many=True)

    class Meta:
        model = TodoList
        fields = ('id', 'title', 'user', 'items', 'completed_items')

    def create(self, validated_data):
        if 'user' not in validated_data:
            validated_data['user'] = self.context['request'].user
        validatRd_data['items'] = []
        return TodoList.objects.create(**validated_data)
