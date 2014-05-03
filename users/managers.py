from django.contrib.auth.models import BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self,username, first_name,last_name,email, birthday, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name = last_name,
            birthday= birthday,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self,username, first_name,last_name,email, birthday, password=None):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(username=username,
            first_name = first_name,
            last_name = last_name,
            password=password,
            birthday=birthday,
            email = email,
        )
        user.is_admin = True
        user.is_superuser = True
        user.save(using=self._db)
        return user
