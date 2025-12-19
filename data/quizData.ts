
import { shuffleArray } from '../utils/shuffle';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  hint: string;
  explanation: string;
}

const quizSet1: QuizQuestion[] = [
  {
    question: "Số 'bảy mươi triệu không trăm linh năm nghìn hai trăm' được viết là:",
    options: ["70 005 200", "7 005 200", "70 050 200", "70 500 200"],
    correctAnswer: "70 005 200",
    hint: "Hãy chú ý đến lớp triệu và lớp nghìn. 'Bảy mươi triệu' là 70 ở lớp triệu. 'Linh năm nghìn' là 005 ở lớp nghìn.",
    explanation: "Số này gồm 70 triệu, 5 nghìn và 2 trăm, nên được viết là 70 005 200."
  },
  {
    question: "Trong số 54 321 678, chữ số 3 thuộc hàng nào, lớp nào?",
    options: ["Hàng chục nghìn, lớp nghìn", "Hàng trăm nghìn, lớp nghìn", "Hàng triệu, lớp triệu", "Hàng trăm, lớp đơn vị"],
    correctAnswer: "Hàng trăm nghìn, lớp nghìn",
    hint: "Hãy đếm từ phải sang trái: lớp đơn vị (3 chữ số), lớp nghìn (3 chữ số), lớp triệu... Chữ số 3 nằm ở đâu?",
    explanation: "Trong số 54 321 678, lớp đơn vị là 678, lớp nghìn là 321. Chữ số 3 đứng đầu lớp nghìn, nên nó thuộc hàng trăm nghìn."
  },
  {
    question: "Điền dấu thích hợp vào chỗ trống: 999 876 ... 1 000 001",
    options: [">", "<", "=", "Không so sánh được"],
    correctAnswer: "<",
    hint: "Khi so sánh hai số tự nhiên, số nào có nhiều chữ số hơn thì lớn hơn.",
    explanation: "Số 999 876 có 6 chữ số, trong khi số 1 000 001 có 7 chữ số. Vì vậy, 999 876 nhỏ hơn 1 000 001."
  },
  {
    question: "Làm tròn số 876 543 đến hàng chục nghìn ta được số nào?",
    options: ["870 000", "877 000", "900 000", "880 000"],
    correctAnswer: "880 000",
    hint: "Để làm tròn đến hàng chục nghìn, hãy nhìn vào chữ số ở hàng nghìn. Nếu nó từ 5 trở lên, ta làm tròn lên.",
    explanation: "Chữ số hàng chục nghìn là 7. Chữ số hàng nghìn là 6 (lớn hơn 5), nên ta làm tròn lên hàng chục nghìn. Số 7 tăng lên 8, vậy ta được 880 000."
  },
  {
    question: "Làm tròn số 4 567 890 đến hàng trăm nghìn ta được số nào?",
    options: ["4 500 000", "4 600 000", "5 000 000", "4 570 000"],
    correctAnswer: "4 600 000",
    hint: "Để làm tròn đến hàng trăm nghìn, hãy nhìn vào chữ số ở hàng chục nghìn. Quy tắc làm tròn lên vẫn áp dụng nhé!",
    explanation: "Chữ số hàng trăm nghìn là 5. Chữ số hàng chục nghìn là 6 (lớn hơn 5), nên ta làm tròn lên hàng trăm nghìn. Số 5 tăng lên 6, vậy ta được 4 600 000."
  },
  {
    question: "Số liền trước của số nhỏ nhất có 7 chữ số là số nào?",
    options: ["999 999", "1 000 001", "999 990", "9 999 999"],
    correctAnswer: "999 999",
    hint: "Số nhỏ nhất có 7 chữ số là số nào? Số liền trước của một số thì bé hơn số đó 1 đơn vị.",
    explanation: "Số nhỏ nhất có 7 chữ số là 1 000 000. Số liền trước của nó là 1 000 000 - 1 = 999 999."
  },
  {
    question: "Số liền sau của số 99 999 999 là số nào?",
    options: ["99 999 998", "10 000 000", "100 000 000", "99 999 990"],
    correctAnswer: "100 000 000",
    hint: "Số liền sau của một số thì lớn hơn số đó 1 đơn vị. Hãy thử thực hiện phép cộng 99 999 999 + 1.",
    explanation: "Số liền sau của 99 999 999 là 99 999 999 + 1 = 100 000 000."
  },
  {
    question: "Số tiếp theo trong dãy số: 2, 4, 8, 16, ... là số nào?",
    options: ["20", "24", "32", "64"],
    correctAnswer: "32",
    hint: "Hãy tìm quy luật của dãy số. Số sau bằng số trước nhân với mấy?",
    explanation: "Đây là dãy số mà số sau bằng số liền trước nhân với 2 (2x2=4, 4x2=8, 8x2=16). Vậy số tiếp theo là 16 x 2 = 32."
  },
  {
    question: "Trong các số sau, số nào là số chẵn: 123, 456, 789, 101?",
    options: ["123", "456", "789", "101"],
    correctAnswer: "456",
    hint: "Số chẵn là số có chữ số tận cùng là 0, 2, 4, 6, hoặc 8.",
    explanation: "Số 456 có chữ số tận cùng là 6, nên nó là số chẵn."
  },
  {
    question: "Dãy số nào dưới đây chỉ gồm các số lẻ?",
    options: ["1, 2, 3, 5, 7", "10, 13, 15, 17", "21, 23, 25, 27", "31, 32, 33, 35"],
    correctAnswer: "21, 23, 25, 27",
    hint: "Số lẻ là các số có chữ số tận cùng là 1, 3, 5, 7, hoặc 9. Hãy kiểm tra tất cả các số trong mỗi dãy.",
    explanation: "Dãy C (21, 23, 25, 27) có tất cả các số đều kết thúc bằng 1, 3, 5, 7, nên đây là dãy số lẻ."
  }
];

const quizSet2: QuizQuestion[] = [
  {
    question: "Kết quả của phép tính 25 x 11 là bao nhiêu?",
    options: ["255", "275", "265", "285"],
    correctAnswer: "275",
    hint: "Khi nhân một số có hai chữ số với 11, ta lấy hai chữ số đó cộng lại rồi viết kết quả vào giữa. Nếu tổng lớn hơn 9, nhớ 1 vào số hàng trăm.",
    explanation: "Ta lấy 2 + 5 = 7, rồi viết 7 vào giữa hai số 2 và 5. Kết quả là 275."
  },
  {
    question: "Một hình chữ nhật có chiều dài 12cm và chiều rộng 8cm. Chu vi của hình chữ nhật đó là:",
    options: ["20cm", "40cm", "96cm", "80cm"],
    correctAnswer: "40cm",
    hint: "Chu vi hình chữ nhật được tính bằng cách lấy (chiều dài + chiều rộng) rồi nhân với 2.",
    explanation: "Chu vi = (12 + 8) x 2 = 20 x 2 = 40cm."
  },
  {
    question: "Năm 2024 có bao nhiêu ngày?",
    options: ["365 ngày", "366 ngày", "364 ngày", "367 ngày"],
    correctAnswer: "366 ngày",
    hint: "Năm nhuận là năm chia hết cho 4. Năm nhuận có 366 ngày. 2024 có chia hết cho 4 không?",
    explanation: "Năm 2024 chia hết cho 4 (2024 / 4 = 506) nên là năm nhuận, có 366 ngày."
  },
  {
    question: "Tìm x, biết: x - 1234 = 5678",
    options: ["4444", "6912", "6802", "7000"],
    correctAnswer: "6912",
    hint: "Muốn tìm số bị trừ, ta lấy hiệu cộng với số trừ.",
    explanation: "x = 5678 + 1234 = 6912."
  },
  {
    question: "Số lớn nhất có 5 chữ số khác nhau là số nào?",
    options: ["99999", "98765", "10234", "98756"],
    correctAnswer: "98765",
    hint: "Hãy bắt đầu viết từ chữ số lớn nhất (9) ở hàng cao nhất và giảm dần cho các hàng tiếp theo.",
    explanation: "Để có số lớn nhất, các chữ số phải lớn nhất và được xếp theo thứ tự giảm dần từ trái sang phải. Vậy số đó là 98765."
  },
  {
    question: "Một cửa hàng có 450kg gạo, đã bán đi 1/5 số gạo đó. Cửa hàng còn lại bao nhiêu kg gạo?",
    options: ["90kg", "360kg", "400kg", "405kg"],
    correctAnswer: "360kg",
    hint: "Đầu tiên, hãy tính số gạo đã bán bằng cách lấy tổng số gạo chia cho 5. Sau đó, lấy tổng số gạo trừ đi số đã bán.",
    explanation: "Số gạo đã bán là: 450 / 5 = 90kg. Số gạo còn lại là: 450 - 90 = 360kg."
  },
  {
    question: "Góc vuông có số đo bằng bao nhiêu độ?",
    options: ["180 độ", "90 độ", "45 độ", "0 độ"],
    correctAnswer: "90 độ",
    hint: "Hãy nhớ lại hình ảnh của chiếc ê-ke trong hộp đồ dùng học tập của con.",
    explanation: "Góc vuông là góc có số đo bằng 90 độ."
  },
  {
    question: "Số La Mã 'XIV' biểu diễn số tự nhiên nào?",
    options: ["14", "16", "9", "24"],
    correctAnswer: "14",
    hint: "X là 10, I là 1, V là 5. Khi I đứng trước V, ta lấy 5 - 1.",
    explanation: "X = 10, IV = 5 - 1 = 4. Vậy XIV = 10 + 4 = 14."
  },
  {
    question: "2 tấn 50 kg bằng bao nhiêu kilogam?",
    options: ["250 kg", "2050 kg", "2500 kg", "2005 kg"],
    correctAnswer: "2050 kg",
    hint: "1 tấn bằng 1000 kg. Hãy đổi 2 tấn ra kg rồi cộng với 50 kg.",
    explanation: "2 tấn = 2000 kg. Vậy 2 tấn 50 kg = 2000 kg + 50 kg = 2050 kg."
  },
  {
    question: "Một giờ và mười lăm phút có bao nhiêu phút?",
    options: ["65 phút", "115 phút", "75 phút", "90 phút"],
    correctAnswer: "75 phút",
    hint: "Một giờ có 60 phút.",
    explanation: "Một giờ có 60 phút, vậy một giờ và mười lăm phút là 60 + 15 = 75 phút."
  }
];

const allQuizSets = [quizSet1, quizSet2];

export const getShuffledQuiz = (): QuizQuestion[] => {
  // 1. Randomly select one of the quiz sets
  const randomSetIndex = Math.floor(Math.random() * allQuizSets.length);
  const selectedSet = allQuizSets[randomSetIndex];
  
  // 2. Shuffle the questions within that set
  return shuffleArray(selectedSet);
};
