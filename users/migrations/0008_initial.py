# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Badgets'
        db.create_table(u'users_badgets', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('medal_name', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('medal_icon', self.gf('django.db.models.fields.files.ImageField')(max_length=100)),
        ))
        db.send_create_signal(u'users', ['Badgets'])

        # Adding model 'User'
        db.create_table(u'users_user', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('password', self.gf('django.db.models.fields.CharField')(max_length=128)),
            ('last_login', self.gf('django.db.models.fields.DateTimeField')(default=datetime.datetime.now)),
            ('first_name', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('last_name', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('birthday', self.gf('django.db.models.fields.DateField')(default=datetime.datetime(2014, 6, 27, 0, 0), null=True)),
            ('email', self.gf('django.db.models.fields.EmailField')(unique=True, max_length=75)),
            ('photo', self.gf('django.db.models.fields.files.ImageField')(max_length=100, blank=True)),
            ('cover', self.gf('django.db.models.fields.files.ImageField')(max_length=100, blank=True)),
            ('city', self.gf('django.db.models.fields.related.ForeignKey')(default=1, to=orm['geographics.City'])),
            ('sex', self.gf('django.db.models.fields.CharField')(max_length=10, null=True)),
            ('date_joined', self.gf('django.db.models.fields.DateTimeField')(default=datetime.datetime.now)),
            ('is_active', self.gf('django.db.models.fields.BooleanField')(default=True)),
            ('is_admin', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('is_superuser', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('facebook_uid', self.gf('django.db.models.fields.PositiveIntegerField')(blank=True)),
        ))
        db.send_create_signal(u'users', ['User'])

        # Adding M2M table for field medals on 'User'
        m2m_table_name = db.shorten_name(u'users_user_medals')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('user', models.ForeignKey(orm[u'users.user'], null=False)),
            ('badgets', models.ForeignKey(orm[u'users.badgets'], null=False))
        ))
        db.create_unique(m2m_table_name, ['user_id', 'badgets_id'])

        # Adding M2M table for field followers on 'User'
        m2m_table_name = db.shorten_name(u'users_user_followers')
        db.create_table(m2m_table_name, (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('from_user', models.ForeignKey(orm[u'users.user'], null=False)),
            ('to_user', models.ForeignKey(orm[u'users.user'], null=False))
        ))
        db.create_unique(m2m_table_name, ['from_user_id', 'to_user_id'])

        # Adding model 'Contact'
        db.create_table(u'users_contact', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('user', self.gf('django.db.models.fields.related.OneToOneField')(to=orm['users.User'], unique=True)),
            ('email', self.gf('django.db.models.fields.EmailField')(max_length=75)),
            ('mobile_phone', self.gf('django.db.models.fields.BigIntegerField')()),
        ))
        db.send_create_signal(u'users', ['Contact'])

        # Adding model 'Rating'
        db.create_table(u'users_rating', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('user_rated', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['users.User'])),
            ('rating_user', self.gf('django.db.models.fields.related.ForeignKey')(related_name='rating_user', to=orm['users.User'])),
            ('stars', self.gf('django.db.models.fields.DecimalField')(max_digits=3, decimal_places=1)),
        ))
        db.send_create_signal(u'users', ['Rating'])


    def backwards(self, orm):
        # Deleting model 'Badgets'
        db.delete_table(u'users_badgets')

        # Deleting model 'User'
        db.delete_table(u'users_user')

        # Removing M2M table for field medals on 'User'
        db.delete_table(db.shorten_name(u'users_user_medals'))

        # Removing M2M table for field followers on 'User'
        db.delete_table(db.shorten_name(u'users_user_followers'))

        # Deleting model 'Contact'
        db.delete_table(u'users_contact')

        # Deleting model 'Rating'
        db.delete_table(u'users_rating')


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
            'birthday': ('django.db.models.fields.DateField', [], {'default': 'datetime.datetime(2014, 6, 27, 0, 0)', 'null': 'True'}),
            'city': ('django.db.models.fields.related.ForeignKey', [], {'default': '1', 'to': u"orm['geographics.City']"}),
            'cover': ('django.db.models.fields.files.ImageField', [], {'max_length': '100', 'blank': 'True'}),
            'date_joined': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'email': ('django.db.models.fields.EmailField', [], {'unique': 'True', 'max_length': '75'}),
            'facebook_uid': ('django.db.models.fields.PositiveIntegerField', [], {'blank': 'True'}),
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'followers': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'related_name': "'follows'", 'blank': 'True', 'to': u"orm['users.User']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_admin': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_superuser': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'last_name': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'medals': ('django.db.models.fields.related.ManyToManyField', [], {'symmetrical': 'False', 'related_name': "'medals'", 'blank': 'True', 'to': u"orm['users.Badgets']"}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'photo': ('django.db.models.fields.files.ImageField', [], {'max_length': '100', 'blank': 'True'}),
            'sex': ('django.db.models.fields.CharField', [], {'max_length': '10', 'null': 'True'})
        }
    }

    complete_apps = ['users']