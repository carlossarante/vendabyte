# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding field 'Brand.device'
        db.add_column(u'articles_brand', 'device',
                      self.gf('django.db.models.fields.related.ForeignKey')(default=1, to=orm['articles.Device']),
                      keep_default=False)

        # Removing M2M table for field brands on 'Device'
        db.delete_table(db.shorten_name(u'articles_device_brands'))


    def backwards(self, orm):
        # Deleting field 'Brand.device'
        db.delete_column(u'articles_brand', 'device_id')

        # Adding M2M table for field brands on 'Device'
        m2m_table_name = db.shorten_name(u'articles_device_brands')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('device', models.ForeignKey(orm[u'articles.device'], null=False)),
            ('brand', models.ForeignKey(orm[u'articles.brand'], null=False))
        ))
        db.create_unique(m2m_table_name, ['device_id', 'brand_id'])


    models = {
        u'articles.article': {
            'Meta': {'object_name': 'Article'},
            'date_posted': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_date_expired': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'model': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['articles.BrandModel']"}),
            'price': ('django.db.models.fields.DecimalField', [], {'max_digits': '7', 'decimal_places': '2'}),
            'selled': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'short_description': ('django.db.models.fields.CharField', [], {'max_length': '140'}),
            'specs': ('django.db.models.fields.TextField', [], {}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['users.User']"})
        },
        u'articles.articlepicture': {
            'Meta': {'object_name': 'ArticlePicture'},
            'art_img': ('django.db.models.fields.files.ImageField', [], {'max_length': '100'}),
            'article': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['articles.Article']"}),
            'cover': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        u'articles.brand': {
            'Meta': {'object_name': 'Brand'},
            'brand': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'device': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['articles.Device']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        u'articles.brandmodel': {
            'Meta': {'object_name': 'BrandModel'},
            'brand': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['articles.Brand']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'model_name': ('django.db.models.fields.CharField', [], {'max_length': '255'})
        },
        u'articles.comment': {
            'Meta': {'object_name': 'Comment'},
            'article': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['articles.Article']"}),
            'comment': ('django.db.models.fields.TextField', [], {}),
            'date_posted': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['users.User']"})
        },
        u'articles.device': {
            'Meta': {'object_name': 'Device'},
            'device_detail': ('django.db.models.fields.CharField', [], {'max_length': '30'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        u'articles.interested': {
            'Meta': {'object_name': 'Interested'},
            'article': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['articles.Article']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['users.User']"})
        },
        u'articles.like': {
            'Meta': {'object_name': 'Like'},
            'article': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['articles.Article']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['users.User']"})
        },
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
        u'users.user': {
            'Meta': {'object_name': 'User'},
            'birthday': ('django.db.models.fields.DateField', [], {}),
            'city': ('django.db.models.fields.related.ForeignKey', [], {'default': '1', 'to': u"orm['geographics.City']"}),
            'cover': ('django.db.models.fields.files.ImageField', [], {'max_length': '100', 'blank': 'True'}),
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75'}),
            'facebook_uid': ('django.db.models.fields.PositiveIntegerField', [], {'blank': 'True'}),
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'following': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'related_name': "'follows'", 'blank': 'True', 'to': u"orm['users.User']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_admin': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_superuser': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'last_name': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'medals': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'related_name': "'medals'", 'blank': 'True', 'to': u"orm['users.Badgets']"}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'photo': ('django.db.models.fields.files.ImageField', [], {'max_length': '100', 'blank': 'True'}),
            'rating': ('django.db.models.fields.DecimalField', [], {'default': '0.0', 'max_digits': '2', 'decimal_places': '1'}),
            'username': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '255'})
        }
    }

    complete_apps = ['articles']