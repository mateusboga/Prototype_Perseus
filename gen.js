
function mazeGen(w){
	
	M.r = [];
	for( i = 0; i < w; i++ ){
		M.r[i] = [];
		for( j = 0; j < w; j++ ){
			M.r[i][j] = {R:false,d:[0,0,0,0]};
			for( k = 0; k < 4; k++ ){ r = Math.floor(Math.random()*3); if( r > 0 ){ M.r[i][j].d[k] = 1 }else{ M.r[i][j].d[k] = 0 } }
		}
	}
	
	for( i = 0; i < w; i++ ){
		for( j = 0; j < w; j++ ){ R = M.r[i][j];
			R.R = true;
			//r = Math.floor(Math.random()*4);
			//if( r > 0 ){ R.R = true }
				rd = Math.floor(Math.random()*4);
				R.d[rd] = 1; if( rd >= R.d.length ){ rd = 0; }else{ rd++ }; R.d[rd] = 1;
				
				if( R.d[0] ){
					if( j <= 0 || (!(M.r[i][j-1].d[1])) ){
						R.d[0] = 0 }
				}
				if( R.d[2] ){ 
					if( i <= 0 || (!(M.r[i-1][j].d[3])) ){
						R.d[2] = 0 }
				}
				if( R.d[1] ){
					if( j > w-2 || (!(M.r[i][j+1].d[0])) ){
						R.d[1] = 0 }
				}
				if( R.d[3] ){ 
					if( i > w-2 || !(M.r[i+1][j].d[2]) ){ 
						R.d[3] = 0 }
				}
				
				if( R.d[0] == 0 && R.d[1] == 0 && R.d[2] == 0 && R.d[3] == 0 ){ R.R = false }
			
		}
	}
	
	for( i = 0; i < w; i++ ){
		for( j = 0; j < w; j++ ){ R = M.r[i][j];
			if( R.R == true ){
				if( R.d[0] == 1 && R.d[1] == 0 && R.d[2] == 0 && R.d[3] == 0 ){ R1 = M.r[i][j-1];
					if( R1.d[0] == 0 && R1.d[2] == 0 && R1.d[3] == 0 ){ M.r[i][j-1].R = false; R.d[0] = 0 }
					if( R.d[0] == 0 && R.d[1] == 0 && R.d[2] == 0 && R.d[3] == 0 ){ R.R = false };
				}
				if( R.d[0] == 0 && R.d[1] == 0 && R.d[2] == 1 && R.d[3] == 0 ){ R1 = M.r[i-1][j];
					if( R1.d[0] == 0 && R1.d[1] == 0 && R1.d[2] == 0 ){ M.r[i-1][j].R = false; R.d[2] = 0 }
					if( R.d[0] == 0 && R.d[1] == 0 && R.d[2] == 0 && R.d[3] == 0 ){ R.R = false };
				}
				if( R.d[0] == 1 && R.d[1] == 1 && R.d[2] == 0 ){
					if( i > 0 ){
					if( M.r[i][j-1].d[2] == 0 && M.r[i][j+1].d[2] == 0 && M.r[i-1][j].R == true ){
						R.d[2] = 1; M.r[i-1][j].d[3] = 1;
					}
					}
				}
				if( R.d[0] == 1 && R.d[1] == 1 && R.d[3] == 0 ){
					if( i < w-2 ){
					if( M.r[i][j-1].d[3] == 0 && M.r[i][j+1].d[3] == 0 && M.r[i+1][j].R == true ){
						R.d[3] = 1; M.r[i+1][j].d[2] = 1;
					}
					}
				}
				if( R.d[2] == 1 && R.d[3] == 1 && R.d[0] == 0 ){
					if( j > 0 ){
					if( M.r[i-1][j].d[0] == 0 && M.r[i+1][j].d[0] == 0 && M.r[i][j-1].R == true ){
						R.d[0] = 1; M.r[i][j-1].d[1] = 1;
					}
					}
				}
				if( R.d[2] == 1 && R.d[3] == 1 && R.d[1] == 0 ){
					if( j < w-2 ){
					if( M.r[i-1][j].d[1] == 0 && M.r[i+1][j].d[1] == 0 && M.r[i][j+1].R == true ){
						R.d[1] = 1; M.r[i][j+1].d[0] = 1;
					}
					}
				}/*
				*/
			}
		}
	}
	
}