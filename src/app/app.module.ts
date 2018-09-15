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
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { SigninComponent } from './signin/signin.component';
import { CtextPipe } from './pipes/ctext.pipe';
import { ContactComponent } from './chat/contacts-box/contact/contact.component';
import { ChatBubbleComponent } from './chat/chat-messages/chat-bubble/chat-bubble.component';
import { SearchBoxComponent } from './chat/contacts-box/search-box/search-box.component';
import { SearchingPipe } from './pipes/searching.pipe';
import { OnlinesPipe } from './pipes/onlines.pipe';
import {AuthInterceptor} from './services/auth.interceptor';
import { ChatFormTypingComponent } from './chat/chat-form/chat-form-typing/chat-form-typing.component';
import { MomentModule } from 'angular2-moment';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsBoxComponent,
    SelectedDetailComponent,
    ChatFormComponent,
    ChatMessagesComponent,
    ChatComponent,
    SignupComponent,
    SigninComponent,
    CtextPipe,
    ContactComponent,
    ChatBubbleComponent,
    SearchBoxComponent,
    SearchingPipe,
    OnlinesPipe,
    ChatFormTypingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    WebsocketModule,
    MomentModule,
    InfiniteScrollModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
