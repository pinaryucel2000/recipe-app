# Generated by Django 3.2.6 on 2021-09-02 10:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_review_recipe'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='subscription',
            name='timeStamp',
        ),
    ]
