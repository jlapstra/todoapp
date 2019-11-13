from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages

@login_required(login_url='/account/login/')
def index(request):
    return render(request, 'frontend/index.html')


def create_user(request):
    if request.method == 'GET':
        form = UserCreationForm()

        return render(request, 'registration/create_user.html', {'form': form})

    elif request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Account created successfully, please log in')
            return redirect('/account/login')
        return render(request, 'registration/create_user.html', {'form': form, 'error': form.errors})
