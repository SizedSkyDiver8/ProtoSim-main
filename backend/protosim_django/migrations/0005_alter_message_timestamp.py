# Generated by Django 5.0.1 on 2024-01-13 12:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('protosim_django', '0004_message'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='timestamp',
            field=models.TimeField(auto_now_add=True),
        ),
    ]