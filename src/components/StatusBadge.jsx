export default function StatusBadge({ status }) {
  const styles = {
    paid: {
      background: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      dot: 'bg-emerald-400'
    },
    pending: {
      background: 'bg-amber-500/10',
      text: 'text-amber-400',
      dot: 'bg-amber-400'
    },
    draft: {
      background: 'bg-violet-500/10',
      text: 'text-violet-400',
      dot: 'bg-violet-400'
    }
  };

  const style = styles[status] || styles.pending;

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium ${style.background}`}>
      <div className={`w-2 h-2 rounded-full ${style.dot}`} />
      <span className={style.text}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    </div>
  );
}