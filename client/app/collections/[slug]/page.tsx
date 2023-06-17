import { Suspense } from "react";
import Loading from "./loading";

interface SlugProps {}

async function getCollection(slug: string) {
  const res = await fetch(`https://api.example.com/artist/${slug}/albums`);
  return res.json();
}
export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const albumsData = getCollection(slug);
  const [albums] = await Promise.all([albumsData]);
  // Initiate both requests in parallel
  //   const artistData = getArtist(username);
  //   const albumsData = getArtistAlbums(username);

  // Wait for the promises to resolve
  //   const [artist, albums] = await Promise.all([artistData, albumsData]);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Albums promise={albumsData} />
      </Suspense>
      {/* <h1>{artist.name}</h1> */}
      {/* <Albums list={albums}></Albums> */}
    </>
  );
}
// Albums Component
async function Albums({ promise }: { promise: Promise<any> }) {
  // Wait for the albums promise to resolve
  const albums = await promise;

  return (
    <ul>
      <li>{albums}</li>
    </ul>
  );
}
