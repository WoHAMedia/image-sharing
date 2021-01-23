import Head from "next/head";

export default function Home({ image }) {
  const year = new Date().getFullYear();

  return (
    <div className="container">
      <Head>
        <title>nr5 dot no</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {!image && <h1>Welcome to the nr5.no screenshot service!</h1>}
        {image && (
          <img src={`data:${image.contentType};base64, ${image.base64}`} />
        )}
      </main>

      <footer>
        <p>Wold Halland Media &copy; {year}</p>
      </footer>

      <style jsx>{`
        .container {
          display: grid;
          grid-template-rows: 1fr 4rem;

          height: 100%;
          width: 100%;
        }

        footer {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(0, 0, 0, 0.4);
        }

        footer > p {
          font-weight: 300;
        }

        main {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        main > h1 {
          font-weight: 300;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          height: -webkit-fill-available;
          height: 100vh;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          background-color: #169bc4;
          color: #fff;
          font-size: 18px;
        }

        #__next {
          height: 100%;
          width: 100%;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.id;

  if (!id) return { props: {} };

  const req = await fetch(
    `https://storage.googleapis.com/nr5enno.appspot.com/${id}`
  );

  if (!req.ok) return { props: {} };

  const res = await req.buffer();

  const image = {
    base64: res.toString("base64"),
    contentType: req.headers.get("content-type"),
  };

  return {
    props: {
      image,
    },
  };
}
