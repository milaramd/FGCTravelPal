import pandas as pd
import sys

def cargar_datos(file_path):
    # Cargar el CSV con delimitador de punto y coma
    return pd.read_csv(file_path, delimiter=';')

def obtener_informacion_estacion(df, stop_id):
    # Obtener información de una estación específica
    estacion = df[df['stop_id'] == stop_id]
    if estacion.empty:
        return None
    return estacion

def main():
    # Ruta del archivo
    file_path = '/hackUAB/assets/gtfs_stops.csv'
    
    # Cargar datos
    paradas_df = cargar_datos(file_path)
    
    # Argumentos de la consola
    if len(sys.argv) != 3:
        print("Uso: python script.py <stop_id1> <stop_id2>")
        return
    
    stop_id1 = sys.argv[1]
    stop_id2 = sys.argv[2]
    
    # Obtener información de las estaciones
    estacion1 = obtener_informacion_estacion(paradas_df, stop_id1)
    estacion2 = obtener_informacion_estacion(paradas_df, stop_id2)
    
    # Mostrar información
    if estacion1 is not None:
        print("Información de la estación", stop_id1)
        print(estacion1)
    else:
        print(f"No se encontró información para la estación {stop_id1}")
    
    if estacion2 is not None:
        print("Información de la estación", stop_id2)
        print(estacion2)
    else:
        print(f"No se encontró información para la estación {stop_id2}")

if __name__ == "__main__":
    main()
