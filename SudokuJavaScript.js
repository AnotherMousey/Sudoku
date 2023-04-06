const button = document.getElementById("button");
const board = document.getElementById("board");

var board_info =
{
	cnt_row : 9,
	cnt_col : 9,
	end : false
};

let state = new Array(board_info.cnt_row+1);
for(var i=1; i<=board_info.cnt_row; i++)
{
	state[i] = new Array(board_info.cnt_col+1).fill(0);
}

let RowState = []
let Row = new Array(board_info.cnt_col);
let exist = new Array(11).fill(false);

let curval = new Array(board_info.cnt_row+1);
for(var i=1; i<=board_info.cnt_col; i++)
{
	curval[i] = new Array(board_info.cnt_col+1).fill(0);
}

function hash(i, j)
{
	return (i-1)*board_info.cnt_col+j-1;
}

function init()
{
	var table=document.createElement('table');
	var row, td;
	for (var i=1; i<=board_info.cnt_row; i++) 
	{
        row = document.createElement('tr');
        for (var j=1; j<=board_info.cnt_col; j++) 
        {
            td = document.createElement('td');
            td.id=hash(i, j);
            row.appendChild(td);
            td.textContent='';
            addCellListener(td, i, j);
        }
        table.appendChild(row);
    }
    document.getElementById('SudokuBoard').appendChild(table);
   	GenerateRow(0);
    GenerateRandomSudokuTable();
}

function GenerateRow(i)
{
	if(i==board_info.cnt_col) RowState.push(Row);
	else
	{
		for(var cur=1; cur<=9; cur++)
		{
			if(exist[cur]) continue;
			Row[i]=cur;
			exist[cur]=true;
			GenerateRow(i+1);
			exist[cur]=false;
		}
	}
}

function validate(i, j)
{
	
}

function GenerateRandomSudokuTable()
{
	for(var i=1; i<=board_info.cnt_row; i++)
	{
		for(var j=0; j<RowState.length; j++)
		{
			var valid=validate(i, j);
			if(valid)
			{
				for(var k=0; k<9; k++)
				{
					state[i][k+1]=RowState[j][k];
				}
				break;
			}
		}
	}
}

function addCellListener(td, i, j)
{
	td.addEventListener('mousedown', function(event){
        if(event.which==1) incre(this, i, j);
    });
    td.addEventListener('contextmenu', function(event){
        decre(event, this, i, j);
    });
}

function incre(cell, i, j)
{
	if(board_info.end) return;
	if(curval[i][j]==0)
	{
		cell.textContent=1;
		curval[i][j]=1;
		return;
	}
	var cur=curval[i][j];
	cur+=1;
	if(cur==10) cur=1;
	curval[i][j]=cur;
	cell.textContent=cur;
}

function decre(event, cell, i, j)
{
	event.preventDefault();
	if(board_info.end) return;
	if(curval[i][j]==0)
	{
		cell.textContent=9;
		curval[i][j]=9;
		return;
	}
	var cur=curval[i][j];
	cur-=1;
	if(cur==0) cur=9;
	curval[i][j]=cur;
	cell.textContent=cur;
}

function toggleEndGame()
{
	if(board_info.end) return;
	for(var i = 1; i <= board_info.cnt_row; i++)
	{
		for(var j = 1; j <= board_info.cnt_col; j++)
		{
			if(curval[i][j]!=state[i][j])
			{
				report(false);
				return;
			}
		}
	}
	report(true);
}

function report(status)
{
	if(status==false)
	{
		document.getElementById("EndGame").innerHTML="Incorrect";
		document.getElementById("EndGame").style.color='red';
	}
	else
	{
		document.getElementById("EndGame").innerHTML="Correct!";
		document.getElementById("EndGame").style.color='green';
		board_info.end=true;
	}
}

window.addEventListener('load', function() {
    init();
});

function newgame()
{
	window.location.reload();
	board_info.dead=false;
}