import TopUpGame from "@/components/TopUpGame";

const page = async ({ params }) => {
  const { id } = await params;
  return (
    <>
      <TopUpGame id={id} />
    </>
  );
};

export default page;
