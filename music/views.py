from django.shortcuts import render,redirect,get_object_or_404
from .models import User,Music,Album
from .forms import Loginform,Userform,Forgetform,Updateform
from django.http import HttpResponse
from django.contrib import messages
from django.contrib.auth.hashers import make_password
# Create your views here.


def start(request):
    albums = Album.objects.all()
    return render(request, 'index.html', {'albums': albums})




def register(request):
    if request.method == 'POST':
        form = Userform(request.POST)
        email = request.POST.get('email')
        if User.objects.filter(email=email).exists():
            messages.warning(request, 'Email already registered')
            return render(request, 'form1.html', {'form': form})

        if form.is_valid():
            try:
                form.save()
                return redirect('login')
            except Exception as e:
                messages.error(request, f"An error occurred: {e}")
                return render(request, 'form1.html', {'form': form})
    else:
        form = Userform()
    return render(request, 'form1.html', {'form': form})


def login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = User.objects.filter(email=email,password=password)
        if user is not None:
            request.session['email']=email
            return redirect('/home')
        else:
            return HttpResponse('Cannot login user doesnt existed')
    else:
        form = Loginform()
        return render(request, 'form2.html', {'form': form})

def home(request):
    if 'email' in request.session:
        try:
            user = User.objects.get(email=request.session['email'])
            albums = Album.objects.all()
            context = {
                'user':user,
                'albums':albums,
            }
            return render(request, 'index.html', context)
        except User.DoesNotExist:
                messages.error(request,'User Does not Existed')
                return redirect('login')
    else:
        return redirect('login')


def show(request):
    if 'email' in request.session:
        try:
            user = User.objects.get(email=request.session['email'])
            return render(request, 'home.html', {'user': user})
        except User.DoesNotExist:
            messages.error(request, 'User Does not Existed Please create an account')
            return redirect('register')
    else:
        return redirect('register')

def edit(request):
    if 'email' in request.session:
        user = User.objects.get(email=request.session['email'])
        return render(request,'form3.html',{'user':user})


def forget_password(request):
    if request.method == 'POST':
        form = Forgetform(request.POST)
        if form.is_valid():
            email = form.cleaned_data.get('email')
            password = form.cleaned_data.get('password')
            confirm_password = form.cleaned_data.get('confirm_password')

            if password == confirm_password:
                user = User.objects.filter(email=email).first()
                if user:
                    user.password = make_password(password)
                    user.save()
                # Show the same success message whether the email exists or not
                messages.success(request, 'If an account with this email exists, the password has been updated.')
                return redirect('login')  # Redirect to the login page
            else:
                messages.error(request, 'Passwords do not match.')
        else:
            messages.error(request, 'Please correct the errors below.')
    else:
        form = Forgetform()

    return render(request, 'form3.html', {'form': form})

def update(request):
        if 'email' in request.session:
            user = User.objects.get(email=request.session['email'])
            form = Updateform(request.POST, instance=user)
            if form.is_valid():
                try:
                    form.save()
                    return redirect('/show')
                except Exception as e:
                    print(e)
        return render(request, 'edit.html', {'user': user})

def delete(request):
    if 'email' in request.session:
        user = User.objects.get(email=request.session['email'])
        user.delete()
        del request.session['email']
    return redirect('start')

def user_logout(request):
    if 'email' in request.session:
        del request.session['email']
    return redirect('start')