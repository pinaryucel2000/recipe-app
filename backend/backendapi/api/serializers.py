
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import Recipe, Ingredient, Review, Course, Diet, Meal, Cuisine, Subscription, Profile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ['id', 'author', 'label', 'imageURL', 'course', 'cuisine', 'totalTime', 'servings', 'calories', 'mealType', 'diet']

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['recipe', 'text', 'weight']

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['userID_recipeID', 'authorUsername', 'recipe', 'rating', 'comment', 'timeStamp']

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['name', 'image']

class DietSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diet
        fields = ['name']

class MealSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meal
        fields = ['name']

class CuisineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cuisine
        fields = ['name']

class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ['id', 'user', "recipeID"]

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['userID', 'email']

class SubscriptionEmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['email']

class SubscribedRecipesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ["recipeID"]