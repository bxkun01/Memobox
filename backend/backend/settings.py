"""
Django settings for backend project.
"""

from pathlib import Path
import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-m9hsod&2w^a6*gon3*7j(hks#@o!8#kbx5c8^pqgfp10!-pb7s'
DEBUG = True

ALLOWED_HOSTS = ["*"]

# =============================
# CORS + CSRF CONFIG
# =============================
CORS_ALLOW_ALL_ORIGINS = False

CORS_ALLOWED_ORIGINS = [
    "https://memoboxx.vercel.app",
]

CORS_ALLOW_CREDENTIALS = True

CSRF_TRUSTED_ORIGINS = [
    "https://*.choreoapps.dev",
    "https://memoboxx.vercel.app",
]

CORS_ALLOW_HEADERS = [
    "authorization",
    "content-type",
]

# =============================
# REST FRAMEWORK + JWT
# =============================
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
}

# =============================
# APPS
# =============================
INSTALLED_APPS = [
    'corsheaders',   # MUST be above Django apps
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'api',
    'user',
]

# =============================
# MIDDLEWARE  (IMPORTANT ORDER)
# =============================
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',   # MUST BE FIRST
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# =============================
# URL CONFIG
# =============================
ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

# =============================
# POSTGRES DATABASE
# =============================
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv("DB_NAME"),
        'USER': os.getenv("DB_USER"),
        'PASSWORD': os.getenv("DB_PWD"),
        'HOST': os.getenv("DB_HOST"),
        'PORT': os.getenv("DB_PORT"),
    }
}

# =============================
# PASSWORD VALIDATION
# =============================
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# =============================
# SYSTEM SETTINGS
# =============================
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

STATIC_URL = 'static/'
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
