from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User
from .forms import AccountCreationForm

from ..profiles.models import Profile


class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = 'Profile'
    fk_name = 'user'


class UserAdmin(UserAdmin):
    inlines = (ProfileInline,)
    add_form_template = 'admin/authentication/account/add_form.html'
    add_form = AccountCreationForm

# admin.site.unregister(User)
admin.site.register(User, UserAdmin)
