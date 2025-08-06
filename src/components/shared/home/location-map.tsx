const LocationMap = () => {
  return (
    <div
      style={{ width: "100%", height: "230px" }}
      className="mt-4 overflow-hidden rounded-md shadow-md"
    >
      <iframe
        title="Rampur Bazar Mazidia High School Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.9117408646944!2d90.69780892493078!3d23.10032651342284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3754e42144d63087%3A0x656ecb4e4e1505d4!2sRampur%20Bazar%20Mazidia%20High%20School%2C%20P.O%3A%20Rampur%20Bazar%2C%20Thana%3A%20Faridgonj%2C%203654!5e0!3m2!1sen!2sbd!4v1754477544053!5m2!1sen!2sbd"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default LocationMap;
