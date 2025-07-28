import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section className="main_container shadow-md">
      <Header />
      <main className="p-3 md:p-5">{children}</main>
      <Footer />
    </section>
  );
};

export default MainLayout;
