export default function Footer() {
  return (
    <footer className="mt-20 p-8 bg-black">
      <p className="text-center">{new Date().getFullYear()}&copy; Bartosz Kaczor</p>
      <p className="text-center">All rights reserved;</p>
    </footer>
  );
}
