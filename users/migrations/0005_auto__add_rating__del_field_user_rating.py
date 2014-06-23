# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Rating'
        db.create_table(u'users_rating', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('user_rated', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['users.User'])),
            ('rating_user', self.gf('django.db.models.fields.related.ForeignKey')(related_name='rating_user', to=orm['users.User'])),
            ('stars', self.gf('django.db.models.fields.DecimalField')(max_digits=3, decimal_places=1)),
        ))
        db.send_create_signal(u'users', ['Rating'])

        # Deleting field 'User.rating'
        db.delete_column(u'users_user', 'rating')


    def backwards(self, orm):
        # Deleting model 'Rating'
        db.delete_table(u'users_rating')

        # Adding field 'User.rating'
        db.add_column(u'users_user', 'rating',
                      self.gf('django.db.models.fields.DecimalField')(default=0.0, max_digits=2, decimal_places=1),
                      keep_default=False)


    models = {
        u'geographics.city': {
            'Meta': {'object_name': 'City'},
            'city_name': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'province': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['geographics.Province']"})
        },
        u'geographics.province': {
            'Meta': {'object_name': 'Province'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'province_name': ('django.db.models.fields.CharField', [], {'max_length': '255'})
        },
        u'users.badgets': {
            'Meta': {'object_name': 'Badgets'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'medal_icon': ('django.db.models.fields.files.ImageField', [], {'max_length': '100'}),
            'medal_name': ('django.db.models.fields.CharField', [], {'max_length': '255'})
        },
        u'users.contact': {
            'Meta': {'object_name': 'Contact'},
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'mobile_phone': ('django.db.models.fields.BigIntegerField', [], {}),
            'user': ('django.db.models.fields.related.OneToOneField', [], {'to': u"orm['users.User']", 'unique': 'True'})
        },
        u'users.rating': {
            'Meta': {'object_name': 'Rating'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'rating_user': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'rating_user'", 'to': u"orm['users.User']"}),
            'stars': ('django.db.models.fields.DecimalField', [], {'max_digits': '3', 'decimal_places': '1'}),
            'user_rated': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['users.User']"})
        },
        u'users.user': {
            'Meta': {'object_name': 'User'},
            'birthday': ('django.db.models.fields.DateField', [], {}),
            'city': ('django.db.models.fields.related.ForeignKey', [], {'default': '1', 'to': u"orm['geographics.City']"}),
            'cover': ('django.db.models.fields.files.ImageField', [], {'max_length': '100', 'blank': 'True'}),
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75'}),
            'facebook_uid': ('django.db.models.fields.PositiveIntegerField', [], {'blank': 'True'}),
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'followers': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'related_name': "'follows'", 'blank': 'True', 'to': u"orm['users.User']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_admin': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_superuser': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'last_name': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'medals': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'related_name': "'medals'", 'blank': 'True', 'to': u"orm['users.Badgets']"}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'photo': ('django.db.models.fields.files.ImageField', [], {'max_length': '100', 'blank': 'True'}),
            'username': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '255'})
        }
    }

    complete_apps = ['users']