export default function OrderTable(): JSX.Element {
  return (
    <table className="order-table">
      <tbody>
        <tr>
          <td>Общее количество товаров</td>
          <td>4</td>
        </tr>
        <tr>
          <td>Дата заказа</td>
          <td>13.09.2022</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>К оплате</td>
          <td>70 000 <span>₽</span></td>
        </tr>
      </tfoot>
    </table>
  );
}
