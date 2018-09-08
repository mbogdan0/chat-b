import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContactsBoxComponent } from './chat/contacts-box/contacts-box.component';
import { SelectedDetailComponent } from './chat/selected-detail/selected-detail.component';
import { ChatFormComponent } from './chat/chat-form/chat-form.component';
import { ChatMessagesComponent } from './chat/chat-messages/chat-messages.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsBoxComponent,
    SelectedDetailComponent,
    ChatFormComponent,
    ChatMessagesComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
