from django.db import models
from django.contrib.auth.models import User

class TodoList(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=40, blank=True)

    @property
    def get_items_in_list(self):
        return Item.objects.filter(todo_list=self.pk, completed=False).order_by('due_date')

    @property
    def get_completed_in_list(self):
        return Item.objects.filter(todo_list=self.pk, completed=True).order_by('due_date')

class Item(models.Model):
    """
        Items are contained within a TodoList
    """
    P1 = 'P1'
    P2 = 'P2'
    P3 = 'P3'
    P4 = 'P4'

    PRIORITY_CHOICES = (
        (P1, 'Urgent'),
        (P2, 'Important'),
        (P3, 'Normal'),
        (P4, 'Low'),
    )

    todo_list = models.ForeignKey(TodoList, on_delete=models.CASCADE)
    completed = models.BooleanField()
    title = models.CharField(max_length=80, blank=True)
    detail = models.TextField(max_length=200, blank=True)
    priority_level = models.CharField(max_length=2, choices=PRIORITY_CHOICES)
    due_date = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

