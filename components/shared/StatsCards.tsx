type StatCard = {
  label: string;
  value: string | number;
};

export default function StatsCards({
  items,
}: {
  items: StatCard[];
}) {
  return (
    <div style={styles.stats}>
      {items.map((item) => (
        <div key={item.label} style={styles.card}>
          <h2>{item.value}</h2>
          <p>{item.label}</p>
        </div>
      ))}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  stats: {
    maxWidth: 900,
    margin: "60px auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: 16,
  },

  card: {
    background: "#fff",
    border: "1px solid #eee",
    padding: 20,
    borderRadius: 14,
    textAlign: "center",
  },
};