

// 출처: https://jun-choi-4928.medium.com/javascript%EB%A1%9C-heap-priority-queue-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-8bc13bf095d9
// Min Heap Strcuture
// 부모 노드는 항상 자식 노드 보다 값이 작아야한다.
/*
 - peek O(1)
 - insert O(logn)
 - remove O(logn)

왼쪽 자식 노드 인덱스 = 부모 노드 인덱스 * 2 + 1
오른쪽 자식 노드 인덱스 = 부모 노드 인덱스 * 2 + 2
부모 노드 인덱스 = (자식 노드 인덱스 - 1) / 2
*/

class Heap {
  constructor() {
      this.heap = []
  }

  getLeftChildIndex = (parentIndex) => parentIndex * 2 + 1
  getRightChildIndex = (parentIndex) => parentINdex * 2 + 2
  getParentIndex = (childIndex) => Math.floor((childIndex - 1) / 2)
  peek = () => {
   if(this.heap.length === 0) {
    throw new Error('Heap is empty')
   }
   this.heap[0] // 항상 최상위 노드
  }

  swap = (index1, index2) =>
   [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
  
  insert = (key, value) => {
      this.heap.push({ key, value })
      this.heapifyUp() // 배열 가장 끝에 넣고, 다시 min heap의 형태를 갖추도록 한다.
  }

  heapifyUp = () => {
      let index = this.heap.length - 1
      const lastInsertedNode = this.heap[index]

      while(index > 0) {
          const parentIndex = this.getParentIndex(index)
          if(this.heap[parentIndex].key > lastInsertedNode.key) {
              this.swap(parentIndex, index)
          } else break
      }
  }

  remove = () => {
      if(this.heap.length === 0) {
         throw new Error('Heap is Error!')
      }
   
      const count = this.heap.length

      if(count ==== 1) return this.heap.pop()

      const rootNode = this.heap[0]
      this.heap[0] = this.heap.pop()
      this.heapifyDown()

      return rootNode
  }

  heapifyDown = () => {
      let index = 0
      const count = this.heap.length
      const rootNode = this.heap[0]

      while(this.getLeftChildIndex(index) < count) {
          let smallerChildIndex = this.getLeftChildIndex(index);
          let rightChildIndex = this.getRightChildIndex(index);

          if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] < this.heap[smallerChildIndex]) {
              smallerChildIndex = rightChildIndex;
          }
       
          if(this.heap[index] <= this.heap[smallerChildIndex]) break;

          this.swap(index, smallerChildIndex)
          index = smallerChildIndex
      }
  }
}

class PriorityQueue extends Heap {
  constructor(){
      super()
  }

  enqueue = (priority, value) => this.insert(priority, value)
  dequeue = () => this.remove()
  front = () => this.peek()
  isEmpty = () => this.heap.length <= 0
}

const pq = new PriorityQueue();
pq.enqueue(5);
pq.enqueue(3);
pq.enqueue(8);
pq.enqueue(1);

console.log(pq.front()); // 1
console.log(pq.dequeue()); // 1
console.log(pq.front()); // 3
console.log(pq.dequeue()); // 3
