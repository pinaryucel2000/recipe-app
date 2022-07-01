from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .import views
from .views import CuisineViewSet, UserViewSet, RecipeViewSet, IngredientsViewSet, ReviewsViewSet, CourseViewSet, MealViewSet, DietViewSet, SubscriptionViewSet, ProfileViewSet, SubscribedRecipesViewSet, SubscriptionEmailsViewSet
from django.conf.urls import url
from .views import CustomObtainAuthToken

router = routers.DefaultRouter()
router.register('users', UserViewSet)
router.register('subscriptions', SubscriptionViewSet, basename="subscriptions")
router.register('recipes', RecipeViewSet, basename="recipes_viewset")
router.register("ingredients", IngredientsViewSet, basename="ingredients_viewset")
router.register("reviews", ReviewsViewSet, basename="reviews_viewset")
router.register("courses", CourseViewSet)
router.register("meals", MealViewSet)
router.register("diets", DietViewSet)
router.register("cuisines", CuisineViewSet)
router.register("profile", ProfileViewSet, basename="profiles_viewset")
router.register("subscribedRecipes", SubscribedRecipesViewSet, basename="sr_viewset")
router.register("subscriptionEmails", SubscriptionEmailsViewSet, basename="se_viewset")

urlpatterns = [
    path('', include(router.urls)),
    url(r'^authenticate/', CustomObtainAuthToken.as_view()),

]