import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import { Router, useRouter } from "next/router";
import { useAuth, SignIn } from "@clerk/nextjs";
import { Icon } from "@iconify/react";

// import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const { isLoaded, userId } = useAuth();
  if (!isLoaded || !userId) {
    return (
      <>
        <div className="drink-background slide-bottom-fade-in">
          <Image
            src="/icon-background.jpg"
            layout="fill"
            objectFit="cover"
            alt="background photo of drinks"
          />
        </div>
        <div className="slide-top-fade-in">
          <Header title={"Bevary"} />
          <div class="section is-centered">
            <div class="hero is-link py-4 center-text">
              <h3 class="title" className="slide-top">
                Welcome to Bevary!
              </h3>
              <h4 class="subtitle is-5">Please Sign-In</h4>
            </div>
          </div>
        </div>
        <div className="fade-in center-element">
          <SignIn />
        </div>
      </>
    );
  } else {
    router.push("/map");
  }
}
