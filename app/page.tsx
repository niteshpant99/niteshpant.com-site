import Image from "next/image";
import { socialLinks } from "./config";

export default function Page() {
  return (
    <section>
      <a href={socialLinks.twitter} target="_blank">
        <Image
          src="/profile.png"
          alt="Profile photo"
          className="rounded-full bg-gray-100 block lg:mt-5 mt-0 lg:mb-5 mb-10 mx-auto sm:float-right sm:ml-5 sm:mb-5 grayscale hover:grayscale-0"
          unoptimized
          width={160}
          height={160}
          priority
        />
      </a>

      <h1 className="mb-8 text-2xl font-medium tracking-tight">
        Hello world! I am Nitesh Pant.
      </h1>

      <div className="prose prose-neutral dark:prose-invert">
        <p>
          I'm the co-founder of <a target="blank" href="https://devdashlabs.com">DevDash Labs</a>. 
          I'm current creating <a target="blank" href="https://arthex.io">arthex</a>, an AI powered
          earnings day stock analyzer to help retail traders earn on earnings.
        </p>
        <p>
          I grew up in Nepal, went to Dartmouth College, and worked as a management consultant. More to be added soon. 
          Visit my other site: <a href="https://niteshpant.com.np">niteshpant.com.np</a>! 
        </p>
        <p>
          Nextfolio is{" "}
          <a href={socialLinks.github} target="_blank">
            open-source
          </a>{" "}
          and fully customizable, making it easy to add more features.
        </p>
        <p>
          <a
            href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F1msirius%2FNextfolio"
            target="_blank"
          >
            Deploy
          </a>{" "}
          your Nextfolio site with Vercel in minutes and follow the set up
          instructions in the{" "}
          <a href="/blog/getting-started">Getting Started</a> post.
        </p>
        <p>
          Built and maintained by{" "}
          <a href="https://imsirius.xyz/" target="_blank">
            Sirius
          </a>
          .
        </p>
      </div>
    </section>
  );
}
