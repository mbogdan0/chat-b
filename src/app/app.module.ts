import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContactsBoxComponent } from './chat/contacts-box/contacts-box.component';
import { SelectedDetailComponent } from './chat/selected-detail/selected-detail.component';
import { ChatFormComponent } from './chat/chat-form/chat-form.component';
import { ChatMessagesComponent } from './chat/chat-messages/chat-messages.component';
import { ChatComponent } from './chat/chat.component';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './signup/signup.component';
import {WebsocketModule} from './websocket';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsBoxComponent,
    SelectedDetailComponent,
    ChatFormComponent,
    ChatMessagesComponent,
    ChatComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    WebsocketModule.config({
      url: 'ws://localhost:4201'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
