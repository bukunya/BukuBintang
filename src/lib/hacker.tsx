import Link from "next/link";
import React from "react";

const Hacker = () => {
  return (
    <div className="prose prose-lg mx-auto">
      <p className="text-lg text-muted-foreground mb-6">
        The Hacker project revolves around a case study focused on hackers, with
        roles divided into two key roles: Front-End and Back-End. While you must
        select and concentrate on one of these roles, you're encouraged to
        incorporate features from both domains, demonstrating a comprehensive
        understanding and practical application of your abilities. Throughout
        this project, you'll explore various aspects of hacking, including
        creating user interfaces and developing robust APIs. For those taking
        the Back-End path, you're also expected to incorporate a light touch of
        AI. Overall, the goal is to highlight your technical range, creativity,
        and practical skills by blending elements from both Front-End and
        Back-End development, resulting in a solution that feels modern,
        thoughtful, and technically strong.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Front-End (Mobile/Web)</h2>
      <p>
        Assignment: <br />
        Clone a user interface (screen/page) of this{" "}
        <Link
          className="underline text-blue-500"
          href="https://www.figma.com/design/v8xQnFgz0fjgGRMztjICtF/Slicing?node-id=5013-125&t=7VxICfrdAmGuWLa0-1"
        >
          link
        </Link>
        . <br />
        Steps to Follow: <br />{" "}
      </p>
      <ol className="list-decimal ml-10">
        <li>
          Access the provided user interface design using the following{" "}
          <Link
            href="https://www.figma.com/design/v8xQnFgz0fjgGRMztjICtF/Slicing?node-id=5013-125&t=7VxICfrdAmGuWLa0-1"
            className="underline text-blue-500"
          >
            link
          </Link>
          .
        </li>
        <li>
          To provide data on slicing such as description, title, and other
          information. Consuming to{" "}
          <Link
            href="https://bukuacak.vercel.app/api"
            className="underline text-blue-500"
          >
            this API
          </Link>
          .
        </li>
        <li>
          Slice the provided app design into appropriate components for the
          web/app.
        </li>
        <li>
          Provide an explanatory video about the project in a maximum of 5
          minutes.
        </li>
      </ol>
      Additional Challenge:
      <ol className="list-decimal ml-10">
        <li>
          Deploy your application using Vercel, Netlify, or serverless hosting
          provider.
        </li>
        <li>
          Implement functional frontend logic, including features such as
          searching, pagination, etc.
        </li>
        <li>
          Projects that show thoughtful execution, overall quality, and a
          natural application of best practices may receive stronger
          consideration.
        </li>
      </ol>
      Tips: If you implement any additional challenges or extra features, make
      sure to briefly mention them in your video so they can be properly
      considered during evaluation.
    </div>
  );
};

export default Hacker;
