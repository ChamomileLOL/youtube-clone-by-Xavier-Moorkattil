// First, we bring in React – it's the language's magic that lets us write HTML-like code inside JavaScript.
import React from 'react';

// These three are like traffic police from 'react-router-dom'. They help us decide which street (URL) leads to which building (component).
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 'Provider' is like a power grid. It gives electricity (data from Redux) to every house (component) in the app.
import { Provider } from 'react-redux';

// This is our central warehouse where all the important data for the app is stored in one neat place.
import store from '../store/store.js';

// This is the main frame or skeleton of our app — like the outer walls of a shopping mall.
import App from '../App';

// Here, we bring all the rooms (components/screens) we want to show based on which gate (URL) people enter from.
import {
  Home,
  YourChannel,
  History,
  Playlist,
  Like,
  CustomizeChannel,
  Signup,
  Login,
  Settings,
  Shorts,
  Video,
  UploadVideo,
  AllVideo,
  AuthLayout,
  Main
} from '../components';

// Now, let’s design the entire map. This function tells the app, “Hey, if the user is here, show them this.”
function Routing() {
  return (
    // First, we plug our app into the Redux power station. This will let any part of the app access important data.
    <Provider store={store}>

      {/* Next, we set up our road navigation system. It watches the address bar and moves us to the right place. */}
      <BrowserRouter>

        {/* Think of this as the giant list where we note down every street name and what to show there. */}
        <Routes>

          {/* When someone types the main address "/", we show the outer layout of our app. */}
          <Route path='/' element={<App />}>

            {/* If they don’t type anything extra after "/", show them the Main screen — like a lobby. */}
            <Route index element={<Main />} />

            {/* Now we list all the inside routes that only work if someone is logged in (protected area). */}
            <Route path='home' element={
              <AuthLayout>
                <Home />
              </AuthLayout>
            } />

            {/* A special area called 'your_channel' — think of it like a private YouTube room. */}
            <Route path='your_channel/*' element={
              <AuthLayout>
                <YourChannel />
              </AuthLayout>
            }>
              {/* If the person is just at "/your_channel", show them all the videos they’ve uploaded. */}
              <Route index element={
                <AuthLayout>
                  <AllVideo />
                </AuthLayout>
              } />
              {/* If they visit "/your_channel/upload_video", show them a page to upload new videos. */}
              <Route path='upload_video' element={
                <AuthLayout>
                  <UploadVideo />
                </AuthLayout>
              } />
            </Route>

            {/* More protected places — like folders that open only if you’re signed in. */}

            {/* Show history page if they want to review what they watched. */}
            <Route path='history' element={
              <AuthLayout>
                <History />
              </AuthLayout>
            } />

            {/* Playlist is like their personal jukebox — only for members. */}
            <Route path='playlist' element={
              <AuthLayout>
                <Playlist />
              </AuthLayout>
            } />

            {/* The videos they liked. This page is private too. */}
            <Route path='like' element={
              <AuthLayout>
                <Like />
              </AuthLayout>
            } />

            {/* This ‘subscriptions’ page shows videos from their favorite creators. Also members-only. */}
            <Route path='subscriptions' element={
              <AuthLayout>
                <Home />
              </AuthLayout>
            } />

            {/* A fun section for YouTube Shorts – still locked behind login. */}
            <Route path='shorts' element={
              <AuthLayout>
                <Shorts />
              </AuthLayout>
            } />

            {/* If they click a specific video, they land on the video watch page. 'id' is a unique name for each video. */}
            <Route path='watch/:id' element={
              <AuthLayout>
                <Video />
              </AuthLayout>
            } />

            {/* A settings page to customize their channel. Like adjusting their personal shop. */}
            <Route path='customize_channel' element={
              <AuthLayout>
                <CustomizeChannel />
              </AuthLayout>
            } />

            {/* A general settings area for more tweaks. Members only. */}
            <Route path='settings' element={
              <AuthLayout>
                <Settings />
              </AuthLayout>
            } />
          </Route>

          {/* These last two streets are open to everyone — for new people to sign up or log in. */}
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

// At the end, we export this map so it can be used anywhere in the app.
export default Routing;
