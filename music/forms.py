from django.contrib.auth.forms import AuthenticationForm
from .models import User
from django import forms
from django.core.exceptions import ValidationError

class Userform(forms.ModelForm):
    class Meta:
        model = User
        fields = "__all__"


class Loginform(AuthenticationForm):
    pass

class Updateform(forms.ModelForm):
    class Meta:
        model = User
        fields = ['name','password','email','age','zip']

class Forgetform(forms.Form):
    email = forms.EmailField(label='Email address', max_length=254)
    password = forms.CharField(label='New password', widget=forms.PasswordInput)
    confirm_password = forms.CharField(label='Confirm password', widget=forms.PasswordInput)

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get('password')
        confirm_password = cleaned_data.get('confirm_password')

        if password and confirm_password and password != confirm_password:
            raise ValidationError("Passwords do not match.")

        return cleaned_data
