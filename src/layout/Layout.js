import React from 'react';
import NavBarComponent from "../components/NavBarComponent";

export default function Layout(props) {
    return (
      <main className="font-Nunito bg-gray-800">
          <NavBarComponent />
          <section>
              { props.children }
          </section>
          <footer className="bottom-0 text-center text-white font-bold pt-4 pb-4 bg-gray-700">
              <p>Copyright © { new Date().getFullYear() }</p>
          </footer>
      </main>
    );
}